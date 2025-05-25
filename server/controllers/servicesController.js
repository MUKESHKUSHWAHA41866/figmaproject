const Service = require("../model/servicesSchema");

// Create a new service
const CreateService = async (req, res) => {
  try {
    const { servicePic, serviceName } = req.body;
    console.log(req.body);
    if (!servicePic || !serviceName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({ servicePic, serviceName });
    await newService.save();

    res
      .status(201)
      .json({ message: "Service created successfully", data: newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all services
const GetServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({ data: services });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const EditService = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceName, servicePic } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Service ID is required.",
        success: false,
      });
    }

    // Fetch existing service data
    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({
        message: "Service not found.",
        success: false,
      });
    }

    // If serviceName or servicePic is not provided, keep the previous value
    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        serviceName: serviceName || existingService.serviceName,
        servicePic: servicePic || existingService.servicePic,
      },
      { new: true } // Returns the updated document
    );

    return res.status(200).json({
      message: "Service updated successfully.",
      success: true,
      data: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const DeleteService = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "ID is required",
        success: false,
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        message: "Task not found",
        success: false,
      });
    }

    await Service.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: "An error occurred while deleting the task",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { CreateService, GetServices, EditService, DeleteService };
