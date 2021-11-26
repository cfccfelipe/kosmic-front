import { gql } from '@apollo/client';
export const GET_ALL_VETS = gql`
	query getAllVets {
		getAllVets {
			_id
			fullname
			email
			phone
		}
	}
`;

export const GET_VET_BY_ID = gql`
	query getVetById($id: String!) {
		getVetById {
			name
			email
			phone
		}
	}
`;
