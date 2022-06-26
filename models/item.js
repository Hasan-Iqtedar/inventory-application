var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  price: { type: Int32Array, required: true },
  number_in_stock: { type: Int32Array, required: true },
  category_id: [
    { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  ],
  supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
});

ItemSchema.virtual('url').get(function () {
  return '/groceries/Item' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);
