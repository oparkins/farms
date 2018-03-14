require 'rails_helper'

RSpec.describe 'OS Type API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }
  let!(:project) { create(:project, division_id: division.id) }
  let!(:version) { create(:version, project_id: project.id) }
  let!(:operating_system) { create(:operating_system,  version_id: version.id) }

  let!(:os_types) { create_list(:os_type, 10, operating_system_id: operating_system.id) }
  let(:os_type_id) { os_types.first.id }


  # Test suite for GET
  describe 'GET /os_types' do
    # make HTTP get request before each example
    before { get "/os_types" }

    it 'returns os_type' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET
  describe 'GET /os_types/:id' do
	  before { get "/os_types/#{os_type_id}" }

    context 'when the record exists' do
      it 'returns the division' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(os_type_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:os_type_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find OsType/)
      end
    end
  end

  # Test suite for POST
  describe 'POST /os_types' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', operating_system_id: operating_system.id } }

    context 'when the request is valid' do
      before { post "/os_types", params: valid_attributes }

      it 'creates a os_type' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/os_types" , params: { notname: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match("{\"message\":\"Validation failed: Operating system must exist, Name can't be blank\"}")
      end
    end
  end

  # Test suite for PUT
  describe 'PUT /os_types/:id' do
    let(:valid_attributes) { { name: 'Eh', operating_system_id: operating_system.id } }

    context 'when the record exists' do
	    before { put "/os_types/#{os_type_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE
  describe 'DELETE /os_types/:id' do
    before { delete "/os_types/#{os_type_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
