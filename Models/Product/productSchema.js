const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  urlKey: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  search_text: { type: String },
  category: {
    type: ObjectId,
    required: false,
    ref: "category",
  },
  tags: {
    type: String,
    required: true,
  },
  weight_unit: {
    type: ObjectId,
    ref: "weight",
    default: "5d5a447da0c7bf2acfe53007",
  },
  volume: {
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    length: {
      type: Number,
    },
  },
  order: {
    type: String,
  },

  //Attribute
  attribute_group: [
    {
      group: {
        type: String,
      },
      order: {
        type: Number,
      },
      is_active: {
        type: Boolean,
        default: false,
      },
      attribute: [
        {
          attribute: {
            type: String,
            required: true,
          },
          value: [
            {
              type: string,
            },
          ],
          description: {
            type: String,
          },
          default_value: {
            type: Number,
          },
        },
      ],
      //Media
      image: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      video: [
        {
          caption: String,
          link: { type: Schema.Types.Mixed },
        },
      ],

      //Inventory
      sku_of_seller: {
        type: String,
      },
      sku_from_system: {
        type: String,
      },
      is_trackable_inventory: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
