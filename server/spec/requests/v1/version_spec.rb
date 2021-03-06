require 'rails_helper'

RSpec.describe 'Version API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }
  let!(:project) { create(:project, division_id: division.id) }
  let!(:version_type) { create(:version_type, project_id: project.id) }
  let!(:versions) {create_list(:version, 10, project_id: project.id, version_type_id: version_type.id) }
  let(:version_id) { versions.first.id }
  
  # Test suite for GET 
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions' do
    # make HTTP get request before each example
    before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions" }

    it 'returns versions' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id' do
	  before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version_id}" }

    context 'when the record exists' do
      it 'returns the version' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(version_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:version_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match("{\"message\":\"Couldn't find Version with [WHERE \\\"versions\\\".\\\"project_id\\\" = ? AND \\\"versions\\\".\\\"id\\\" = ?]\"}")
      end
    end
  end

  # Test suite for POST
  describe 'POST /v1/companies/:id/divisions/:id/projects/:id/versions' do
    # valid payload
    let(:valid_attributes) { { gitLink: 'Learn Elm', docLink: "myself", ciLink: "some url", buildDate: "2001-02-03T12:00:00+00:00", version_type_id: version_type.id } }

    context 'when the request is valid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions", params: valid_attributes }

      it 'creates a version' do
        expect(json['gitLink']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions", params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match("{\"message\":\"Validation failed: Version type must exist, Builddate can't be blank\"}")
      end
    end
  end

  # Test suite for PUT
  describe 'PUT /companies/:id/divisions/:id/projects/:id/versions/:id' do
    let(:valid_attributes) { { gitLink: 'Learn Elm', docLink: "myself", ciLink: "some url", buildDate: "", version_type_id: version_type.id } }

    context 'when the record exists' do
	    before { put "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE
  describe 'DELETE /v1/companies/:id/divisions/:id/projects/:id/versions/:id' do
    before { delete "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
