export function Create3DMatrix(): number[][][] {
	const matrix: number[][][] = [];

	for (let i = 0; i < 10; i++) {
		matrix[i] = [];
		for (let j = 0; j < 10; j++) {
			matrix[i][j] = [];
			for (let k = 0; k < 10; k++) {
				matrix[i][j][k] = 0;
			}
		}
	}

	return matrix;
}

export function GenerateRandomMatrix() {
	const matrix = Create3DMatrix();
}
