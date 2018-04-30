require 'rails_helper'

RSpec.describe 'Libs API', type: :request do
  # initialize test data 
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }
  let!(:project) { create(:project, division_id: division.id) }

  let!(:version_type) { create(:version_type, project_id: project.id) }
  let!(:version) { create(:version, project_id: project.id, version_type_id: version_type.id) }

  let!(:os_type) { create(:os_type) }
  let!(:operating_system) { create(:operating_system, version_id: version.id, os_type_id: os_type.id) }

  let!(:libs) { create_list(:lib, 10, operating_system_id: operating_system.id) }
  let(:lib_id) { libs.first.id }

  # Test suite for GET
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/libs' do
    # make HTTP get request before each example
    before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/libs" }

    it 'returns libs' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET
  describe 'GET /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/libs/:id' do
    before { get "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/libs/#{lib_id}" }

    context 'when the record exists' do
      it 'returns the lib' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(lib_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:lib_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match("{\"message\":\"Couldn't find Lib with [WHERE \\\"libs\\\".\\\"operating_system_id\\\" = ? AND \\\"libs\\\".\\\"id\\\" = ?]\"}")
      end
    end
  end

  # Test suite for POST
  describe 'POST /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/libs' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', verify: 'Street 1', link: 'line 2' } }

    context 'when the request is valid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/libs", params: valid_attributes }

      it 'creates a libs' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/libs/", params: { idk: 'Foobar' } }

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
  describe 'PUT /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/libs/:id' do
    let(:valid_attributes) { { name: 'Learn Elm', verify: 'Street 1', link: 'line 2' } }

    context 'when the record exists' do
      before { put "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/libs/#{lib_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE
  describe 'DELETE /v1/companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/libs/:id' do
    before { delete "/v1/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/libs/#{lib_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
