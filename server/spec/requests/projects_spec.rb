require 'rails_helper'

RSpec.describe 'Projects API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division, company_id: company.id) }

  let!(:projects) { create_list(:project, 10, division_id: division.id) }
  let(:project_id) { projects.first.id }

  # Test suite for GET
  describe 'GET /companies/:id/divisions/:id/projects' do
    # make HTTP get request before each example
    before { get "/companies/#{company.id}/divisions/#{division.id}/projects" }

    it 'returns projects' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET 
  describe 'GET /companies/:id/divisions/:id/projects/:id' do
    before { get "/companies/#{company.id}/divisions/#{division.id}/projects/#{project_id}" }

    context 'when the record exists' do
      it 'returns the project' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(project_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:project_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match("{\"message\":\"Couldn't find Project with [WHERE \\\"projects\\\".\\\"division_id\\\" = ? AND \\\"projects\\\".\\\"id\\\" = ?]\"}")
      end
    end
  end

  # Test suite for POST
  describe 'POST /companies/:id/divisions/:id/projects' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', projectLead: 'me', email: 'hello@test.com' } }

    context 'when the request is valid' do
      before { post "/companies/#{company.id}/divisions/#{division.id}/projects", params: valid_attributes }

      it 'creates a projects' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/companies/#{company.id}/divisions/#{division.id}/projects", params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/\"message\":\"Validation failed: Projectlead can't be blank, Email can't be blank\"/)
      end
    end
  end

  # Test suite for PUT
  describe 'PUT /companies/:id/divisions/:id/projects/:id' do
    let(:valid_attributes) { { name: 'Learn Elm', projectLead: 'me', email: 'hello@test.com' } }

    context 'when the record exists' do
      before { put "/companies/#{company.id}/divisions/#{division.id}/projects/#{project_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE 
  describe 'DELETE /companies/:id/divisions/:id/projects/:id' do
    before { delete "/companies/#{company.id}/divisions/#{division.id}/projects/#{project_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
