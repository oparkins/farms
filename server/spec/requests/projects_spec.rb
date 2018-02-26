require 'rails_helper'

RSpec.describe 'Projects API', type: :request do
  # initialize test data 
  let!(:projects) { create_list(:project, 10) }
  let(:projects_id) { projects.first.id }

  # Test suite for GET /todos
  describe 'GET /projects' do
    # make HTTP get request before each example
    before { get '/projects' }

    it 'returns projects' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /todos/:id
  describe 'GET /projects/:id' do
    before { get "/projects/#{project_id}" }

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
        expect(response.body).to match(/Couldn't find Company/)
      end
    end
  end

  # Test suite for POST /todos
  describe 'POST /projects' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', addressLine1: 'Street 1', addressLine2: 'line 2', addressCity: 'some city', addressState: 'some state', addressZip: 'some zip 00000', logo: 'some url/asd/', phone: '123-456-7890', email: 'bestteamever@FARMS.com' } }

    context 'when the request is valid' do
      before { post '/projects', params: valid_attributes }

      it 'creates a projects' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/projects', params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Addressline1 can't be blank, Addressline2 can't be blank, Addresscity can't be blank, Addressstate can't be blank, Addresszip can't be blank, Logo can't be blank, Phone can't be blank, Email can't be blank/)
      end
    end
  end

  # Test suite for PUT /todos/:id
  describe 'PUT /projects/:id' do
    let(:valid_attributes) { { name: 'Learn Elm', addressLine1: 'Street 1', addressLine2: 'line 2', addressCity: 'some city', addressState: 'some state', addressZip: 'some zip 00000', logo: 'some url/asd/', phone: '123-456-7890', email: 'bestteamever@FARMS.com' } }

    context 'when the record exists' do
      before { put "/projects/#{project_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /todos/:id
  describe 'DELETE /projects/:id' do
    before { delete "/projects/#{project_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
