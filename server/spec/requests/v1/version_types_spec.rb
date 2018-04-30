require 'rails_helper'

RSpec.describe 'Version Type API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }
  let!(:project) { create(:project, division_id: division.id) }
  let!(:version_types) { create_list(:version_type, 10, project_id: project.id)}
  let!(:version_type_id) { version_types.first.id }

  # Test suite for GET
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id/version_type' do
    # make HTTP get request before each example
    before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/version_types" }

    it 'returns version_type' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET 
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id/version_type/:id' do
	  before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/version_types/#{version_type_id}" }

    context 'when the record exists' do
      it 'returns the division' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(version_type_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:version_type_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match("{\"message\":\"Couldn't find VersionType with [WHERE \\\"version_types\\\".\\\"project_id\\\" = ? AND \\\"version_types\\\".\\\"id\\\" = ?]\"}")
      end
    end
  end

  # Test suite for POST
  describe 'POST /v1/companies/:id/divisions/:id/projects/:id/versions/:id/version_type' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', project_id: project.id } }

    context 'when the request is valid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/version_types", params: valid_attributes }

      it 'creates a version_type' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/version_types", params: { pineapple: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match("{\"message\":\"Validation failed: Name can't be blank\"}")
      end
    end
  end

  # Test suite for PUT 
  describe 'PUT /v1/companies/:id/divisions/:id/projects/:id/versions/:id/version_type/:id' do
    let(:valid_attributes) { { name: 'Eh' } }

    context 'when the record exists' do
	    before { put "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/version_types/#{version_type_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE 
  describe 'DELETE /v1/companies/:id/divisions/:id/projects/:id/versions/:id/version_type/:id' do
    before { delete "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/version_types/#{version_type_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
