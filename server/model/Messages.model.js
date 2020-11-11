import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

export default mongoose.model('messages', messagesSchema)