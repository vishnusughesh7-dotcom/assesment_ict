import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Event name is required"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true
    },
    date: {
      type: Date,
      required: [true, "Event date is required"]
    },
    venue: {
      type: String,
      required: [true, "Venue is required"],
      trim: true
    },
    totalRegistrations: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);