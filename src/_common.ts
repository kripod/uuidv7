const UNIXTS_BITS = 36;
const MSEC_BITS = 12;
const VER_DIGIT = "7";
const SEQ_BITS = 12;
const VAR = 0b10;
const VAR_BITS = 2;
const RAND_BITS = 62;

export function uuidv7Builder(
	getRandomValues: (array: Uint32Array) => Uint32Array,
) {
	let prevTimestamp = -1;
	let seq = 0;

	return () => {
		// Negative system clock adjustments are ignored to keep monotonicity
		const timestamp = Math.max(Date.now(), prevTimestamp);
		seq = timestamp === prevTimestamp ? seq + 1 : 0;
		prevTimestamp = timestamp;

		const unixts = Math.trunc(timestamp / 1000);
		const msec = timestamp % 1000;

		const var_rand = new Uint32Array(2);
		getRandomValues(var_rand);
		var_rand[0] = (VAR << (32 - VAR_BITS)) | (var_rand[0]! >>> VAR_BITS);

		const digits =
			unixts.toString(16).padStart(UNIXTS_BITS / 4, "0") +
			msec.toString(16).padStart(MSEC_BITS / 4, "0") +
			VER_DIGIT +
			seq.toString(16).padStart(SEQ_BITS / 4, "0") +
			var_rand[0]!.toString(16).padStart((VAR_BITS + RAND_BITS) / 2 / 4, "0") +
			var_rand[1]!.toString(16).padStart((VAR_BITS + RAND_BITS) / 2 / 4, "0");

		return (
			digits.slice(0, 8) +
			"-" +
			digits.slice(8, 12) +
			"-" +
			digits.slice(12, 16) +
			"-" +
			digits.slice(16, 20) +
			"-" +
			digits.slice(20)
		);
	};
}
