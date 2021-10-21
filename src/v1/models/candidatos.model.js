import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import * as paginationHelper from "../helpers/pagination.helper";
import toJSONPlugin from "./plugins/toJSON.plugin";


const candidatosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    skills:{
        type:Array,
        required:true
    }
});

// add plugin that converts mongoose to json
candidatosSchema.plugin(toJSONPlugin);

candidatosSchema.statics.paginate = async function (filter = {}, options = {}) {
	let filterFind = {};
	let advancedFilter = [];
	let searchFilter = [];

	// busqueda por search
	if (options.search) {
		// en columnas debe ser puros tipos strings, si hay otor tipo de busqueda ponerlo aparte
		const columns = ["skills"];
		searchFilter = paginationHelper.search(options.search, columns);

		if (searchFilter.length > 0) {
			filterFind["$or"] = searchFilter;
		}
	}

	const sort = paginationHelper.sortBy(options.sortBy);
	const limit = paginationHelper.limit(options.limit);
	const page = paginationHelper.page(options.page);
	const skip = paginationHelper.skip(page, limit);

	const countPromise = this.countDocuments(filterFind).exec();
	let docsPromise = this.find(filterFind).sort(sort).skip(skip).limit(limit);

	if (options.populate) {
		options.populate.split(",").forEach((populateOption) => {
			docsPromise = docsPromise.populate(
				populateOption
					.split(".")
					.reverse()
					.reduce((a, b) => ({ path: b, populate: a }))
			);
		});
	}

	docsPromise = docsPromise.exec();

	return Promise.all([countPromise, docsPromise]).then((values) => {
		const [totalResults, results] = values;
		const totalPages = Math.ceil(totalResults / limit);
		const result = {
			results,
			page,
			limit,
			totalPages,
			totalResults,
		};

		return Promise.resolve(result);
	});
};

/**
 * @typedef Candidatos
 */
 const Candiato = mongoose.model("Candidatos", candidatosSchema);

 export default Candiato;