import { gql } from '@apollo/client';
export const GET_ALL_VETS = gql`
	query getAllVets {
		getAllVets {
			fullname
			email
			phone
		}
	}
`;
