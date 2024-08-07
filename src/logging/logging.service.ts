import { Injectable, type LoggerService } from "@nestjs/common";
import * as winston from "winston";
import "winston-daily-rotate-file";

@Injectable()
export class LoggingService implements LoggerService {
	logger: winston.Logger;

	constructor() {
		const transports = [
			// アクセスログの出力先設定
			new winston.transports.DailyRotateFile({
				level: "info", // debugを指定すると、debug以上のログが出力される
				datePattern: "YYYY-MM-DD", // 'YYYY-MM-DD'に設定すると、ログファイルが日付毎に作られる
				filename: "%DATE%.log", // 保存先ファイル名(上記のdatePatternが含まれる)
				dirname: "storage/logs/app", // ログファイルの保存先ディレクトリ名
				maxSize: "20m", // ローテートするファイルの最大サイズ
				maxFiles: "7d", // 保存するログの最大数(日数を使う場合は接尾辞として'd'を追加)
			}),
			// エラーログの出力先設定
			new winston.transports.DailyRotateFile({
				level: "error",
				datePattern: "YYYY-MM-DD",
				filename: "error-%DATE%.log",
				dirname: "storage/logs/app",
				maxSize: "20m",
				maxFiles: "7d",
			}),
		];
		const logger = winston.createLogger({
			format: winston.format.combine(
				winston.format.timestamp({
					format: "YYYY-MM-DD HH:mm:ss", // タイムスタンプのフォーマットを変える
				}),
				winston.format.errors({ stack: true }), // エラー時はスタックトレースを出力する
				winston.format.printf(
					(info) => `[${info.level}] [${info.timestamp}] ${info.message}`, // 出力内容をカスタマイズする
				),
			),
			transports: transports,
		});

		// 本番環境以外ではコンソールにも出力する
		if (process.env.NODE_ENV !== "prod") {
			logger.add(
				new winston.transports.Console({
					level: "debug",
					format: winston.format.combine(
						winston.format.colorize(), // ログを色付けする
						winston.format.errors({ stack: true }), // エラー時はスタックトレースを出力する
						winston.format.printf(
							(info) => `[${info.level}] [${info.timestamp}] ${info.message}`, // 出力内容をカスタマイズする
						),
					),
				}),
			);
		}

		this.logger = logger;
	}

	log(message: string) {
		this.logger.log({
			level: "info",
			message: `${message}`,
		});
	}

	error(message: string, trace: string) {
		this.logger.log({
			level: "error",
			message: `${message}:${trace}`,
		});
	}

	warn(message: string) {
		this.logger.log({
			level: "warn",
			message: `${message}`,
		});
	}

	debug(message: string) {
		this.logger.log({
			level: "debug",
			message: `${message}`,
		});
	}

	verbose(message: string) {
		this.logger.log({
			level: "verbose",
			message: `${message}`,
		});
	}
}
