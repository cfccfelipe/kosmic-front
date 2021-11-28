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

export const NEW_BOVINE = gql`
	mutation newBovine($name: String!, $birth: String!) {
		newBovine(input: { name: $name, birth: $birth }) {
			id
			name
			birth
		}
	}
`;
export const DELETE_MANAGER_BY_ID = gql`
	mutation deleteManagerById($id: ID!) {
		deleteManagerById(input: { id: $id })
	}
`;
export const DELETE_BOVINE_BY_ID = gql`
	mutation deleteBovineById($id: ID!) {
		deleteBovineById(input: { id: $id })
	}
`;
export const UPDATE_BOVINE_BY_ID = gql`
	mutation updateBovineById($id: ID!, $state: String!) {
		updateBovineById(input: { id: $id, state: $state }) {
			id
			state
		}
	}
`;
export const NEW_RECORD_ON_BOVINE = gql`
	mutation newRecordOnBovineById(
		$bovine_id: ID!
		$event_date: String!
		$temperature: Float!
		$heart_rate: Float!
		$breathing_rate: Float!
	) {
		newRecordOnBovineById(
			input: {
				bovine_id: $bovine_id
				records: {
					newrecord: {
						temperature: $temperature
						event_date: $event_date
						heart_rate: $heart_rate
						breathing_rate: $breathing_rate
					}
				}
			}
		) {
			name
			birth
			state
			records {
				id
				record_id {
					id
					event_date
					temperature
					heart_rate
					breathing_rate
				}
				treatment
			}
		}
	}
`;
