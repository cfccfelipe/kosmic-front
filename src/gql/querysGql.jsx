import { gql } from '@apollo/client';
export const GET_ALL_VETS = gql`
	query getAllVets {
		getAllVets {
			_id
			fullname
			email
			phone
            clinic
            id
		}
	}
`;

export const GET_VET_BY_ID = gql`
	query getVetById($id: String!) {
		getVetById {
		    fullname
			email
			phone
            clinic
            id
		}
	}
`;
export const GET_ALL_BOVINE = gql`
	query getAllBovine{
		getAllBovine {
		    name
            id
			birth
			state
            records {
                record_id {
                    temperature
                    heart_rate
                    breathing_rate
                    event_date
                }
                treatment
            }
		}
	}
`;
export const GET_BOVINE_BY_ID = gql`
	query getBovineById($id: String!) {
		getBovineById {
		    name
			birth
			state
            create_at
		}
	}
`;
