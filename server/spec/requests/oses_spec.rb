require 'rails_helper'

RSpec.describe 'os API', type: :request do
  # initialize test data
  let!(:company) { create(:company) }
  let!(:division) { create(:division) }
  let!(:project) { create(:project) }
  let!(:version) { create(:version) }
  let!(:os) { create_list(:division, 10, company_id: company.id) }
  let(:division_id) { os.first.id }

  # Test suite for GET /todos
  describe 'GET /companies/:id/divisions/:id/projects/:id/versions/:id/oses/' do
    # make HTTP get request before each example
    before { get "/companies/#{company.id}/os" }

    it 'returns os' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /todos/:id
  describe 'GET /companies/:id/os/:id' do
	  before { get "/companies/#{company.id}/os/#{division_id}" }

    context 'when the record exists' do
      it 'returns the division' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(division_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:division_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Division/)
      end
    end
  end

  # Test suite for POST /todos
  describe 'POST /companies/:id/os' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm',director: "myself", divisionLink: "some url" } }

    context 'when the request is valid' do
      before { post "/companies/#{company.id}/os", params: valid_attributes }

      it 'creates a os' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post "/companies/#{company.id}/os", params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/"message\":\"Validation failed: Director can't be blank, Divisionlink can't be blank\"/)
      end
    end
  end

  # Test suite for PUT /todos/:id
  describe 'PUT /os/:id' do
    let(:valid_attributes) { { name: 'Eh', director: 'hello', divisionLink: 'url some' } }

    context 'when the record exists' do
	    before { put "/companies/#{company.id}/os/#{division_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /todos/:id
  describe 'DELETE /companies/:id/os/:id' do
    before { delete "/companies/#{company.id}/os/#{division_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
