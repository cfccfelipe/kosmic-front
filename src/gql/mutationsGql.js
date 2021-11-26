import { gql } from '@apollo/client';
export const NEW_VET = gql`
	mutation newVet(
		$id: String!
		$fullname: String!
		$email: String!
		$phone: Float!
		$clinic: String!
	) {
		newVet(
			input: {
				id: $id
				fullname: $fullname
				email: $email
				phone: $phone
				clinic: $clinic
			}
		) {
			id
			fullname
			email
			phone
			clinic
		}
	}
`;

export const DELETE_VET_BY_ID = gql`
	mutation deleteVetById($id: ID!) {
		deleteVetById(input: { id: $id })
	}
`;
