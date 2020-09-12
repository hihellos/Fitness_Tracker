const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      // For the schema of this attribute, define type and default
      type: Date,
      default: () => new Date(),
    },
    exercises: [
      // Schema for each item in exercises array
      {
        type: {
          type: String, 
          trim: true,
          required: "Select Resistance or Cardio"
        },
        name: {
          type: String,
          trim: true,
          required: "Exercise name required."
        },
        duration: {
          type: Number,
          required: "Enter exercise duration time."
        },
        weight: {
          type: Number,          
          required: "Weight required."
        },
        reps: {
          type: Number,
          required: "Number of reps required."
        },
        sets: {
          type: Number,
          required: "Number of sets required."
        },
        distance: {
          type: Number,
          required: "Distance required."
        },
      },
    ],
  },
  {
    toJSON: {
      // include any virtual properties when data is requested
      virtuals: true,
    },
  }
);

// adds a dynamically-created property to schema
workoutSchema.virtual('totalDuration').get(function () {
  // "reduce" array of exercises down to just the sum of their durations
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;