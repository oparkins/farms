require 'rails_helper'

RSpec.describe 'Operating Systems API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }
  let!(:project) { create(:project, division_id: division.id) }

  let!(:version_type) { create(:version_type, project_id: project.id) }
  let!(:version) { create(:version, project_id: project.id, version_type_id: version_type.id) }
  
  let!(:os_type) { create(:os_type) }

  let!(:operating_systems) { create_list(:operating_system, 10, version_id: version.id, os_type_id: os_type.id) }
  let(:operating_system_id) { operating_systems.first.id }

  # Test suite for GET 
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/' do
    # make HTTP get request before each example
    before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems" }

    it 'returns operating system' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET 
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id' do
	  before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system_id}" }

    context 'when the record exists' do
      it 'returns the division' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(operating_system_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:operating_system_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match("{\"message\":\"Couldn't find OperatingSystem with [WHERE \\\"operating_systems\\\".\\\"version_id\\\" = ? AND \\\"operating_systems\\\".\\\"id\\\" = ?]\"}")
      end
    end
  end

  # Test suite for POST 
  describe 'POST /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id' do
    # valid payload
    let(:valid_attributes) { { os_type_id: os_type.id  } }

    context 'when the request is valid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end
  end

  # Test suite for PUT
  describe 'PUT /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id' do
    let(:valid_attributes) { { os_type_id: os_type.id } }

    context 'when the record exists' do
	    before { put "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE
  describe 'DELETE /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id' do
    before { delete "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
