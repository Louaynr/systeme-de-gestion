const mongoose = require("mongoose")

const supplierOrderSchema = new mongoose.Schema(
  {
    fournisseur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateCommande: {
      type: Date,
      default: Date.now,
    },
    statutCommande: {
      type: String,
      enum: ["en attente", "en cours", "livrée", "annulée"],
      default: "en attente",
    },
    dateLivraisonPrevue: {
      type: Date,
      required: true,
    },
    dateLivraisonEffective: {
      type: Date,
    },
    montantTotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
)

const supplierOrderLineSchema = new mongoose.Schema(
  {
    commandeFournisseur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupplierOrder",
      required: true,
    },
    livre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantite: {
      type: Number,
      required: true,
      min: 1,
    },
    prixUnitaire: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
)

const SupplierOrder = mongoose.model("SupplierOrder", supplierOrderSchema)
const SupplierOrderLine = mongoose.model("SupplierOrderLine", supplierOrderLineSchema)

module.exports = { SupplierOrder, SupplierOrderLine }
