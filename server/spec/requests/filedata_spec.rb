require 'rails_helper'

RSpec.describe 'FileDatums API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }
  let!(:project) { create(:project, division_id: division.id) }
  let!(:version) { create(:version, project_id: project.id) }
  let!(:operating_system) { create(:operating_system, version_id: version.id) }
  let!(:fileDatums) { create_list(:file_datum, 10, operating_system_id: operating_system.id) }
  let(:file_datum_id) { fileDatums.first.id }

  # Test suite for GET
  describe 'GET /companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/filedata' do
    # make HTTP get request before each example
    before { get "/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/filedata" }

    it 'returns fileDatums' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET 
  describe 'GET /companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/filedata/:id' do
    before { get "/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/filedata/#{file_datum_id}" }

    context 'when the record exists' do
      it 'returns the file_datum' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(file_datum_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:file_datum_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match("{\"message\":\"Couldn't find FileDatum with [WHERE \\\"file_data\\\".\\\"operating_system_id\\\" = ? AND \\\"file_data\\\".\\\"id\\\" = ?]\"}")
      end
    end
  end

  # Test suite for POST
  describe 'POST /companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/filedata' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', data: 'Street 1', dataHash: 'line 2' } }

    context 'when the request is valid' do
      before { post "/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/filedata", params: valid_attributes }

      it 'creates a fileDatums' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/filedata", params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match("{\"message\":\"Validation failed: Data can't be blank, Datahash can't be blank\"}")
      end
    end
  end

  # Test suite for PUT 
  describe 'PUT /companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/filedata/:id' do
    let(:valid_attributes) { { name: 'Learn Elm', data: 'Street 1', dataHash: 'line 2' } }

    context 'when the record exists' do
      before { put "/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/filedata/#{file_datum_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE 
  describe 'DELETE /companies/:id/divisions/:id/projects/:id/versions/:id/operating_systems/:id/filedata/:id' do
    before { delete "/companies/#{company.id}/divisions/#{division.id}/projects/#{project.id}/versions/#{version.id}/operating_systems/#{operating_system.id}/filedata/#{file_datum_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
