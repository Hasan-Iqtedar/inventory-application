var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SupplierSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
});

SupplierSchema.virtual('url').get(function () {
  return '/groceries/supplier' + this._id;
});

module.exports = mongoose.model('Supplier', SupplierSchema);
