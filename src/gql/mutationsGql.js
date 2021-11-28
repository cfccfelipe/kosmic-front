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
export const NEW_MANAGER = gql`
	mutation newManager(
		$id: String!
		$name: String!
		$email: String!
		$phone: Float!
		$position: String!
	) {
		newManager(
			input: {
				id: $id
				name: $name
				email: $email
				phone: $phone
				position: $position
			}
		) {
			id
			name
			email
			phone
			position
		}
	}
`;
export const DELETE_MANAGER_BY_ID = gql`
	mutation deleteManagerById($id: ID!) {
		deleteManagerById(input: { id: $id })
	}
`;
