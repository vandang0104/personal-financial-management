const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',      
    required: true    
  },
  type: {
    type: String,
    enum: ['income', 'expense'], 
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0 
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    default: 'Khác',
    trim: true
  },
  date: {
    type: Date,
    default: Date.now 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);