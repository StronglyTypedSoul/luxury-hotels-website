import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envSchema = joi
	.object()
	.keys({
		NODE_ENV: joi.string().valid("production", "development").required(),
		PORT: joi.number().positive().required(),
		DATABASE_URL: joi.string().required(),
		RABBITMQ_HOST: joi.string().required(),
		RABBITMQ_PASTES_QUEUE: joi.string().required(),
	})
	.unknown();

const { error } = envSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
	console.error(`Config validation error: ${error.message}`);
	process.exit(0);
}
