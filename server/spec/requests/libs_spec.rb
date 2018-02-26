require 'rails_helper'

RSpec.describe 'Libs API', type: :request do
  # initialize test data 
  let!(:libs) { create_list(:lib, 10) }
  let(:lib_id) { libs.first.id }

  # Test suite for GET /todos
  describe 'GET /libs' do
    # make HTTP get request before each example
    before { get '/libs' }

    it 'returns libs' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /todos/:id
  describe 'GET /libs/:id' do
    before { get "/libs/#{lib_id}" }

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
        expect(response.body).to match(/Couldn't find lib/)
      end
    end
  end

  # Test suite for POST /todos
  describe 'POST /libs' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', addressLine1: 'Street 1', addressLine2: 'line 2', addressCity: 'some city', addressState: 'some state', addressZip: 'some zip 00000', logo: 'some url/asd/', phone: '123-456-7890', email: 'bestteamever@FARMS.com' } }

    context 'when the request is valid' do
      before { post '/libs', params: valid_attributes }

      it 'creates a libs' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/libs', params: { name: 'Foobar' } }

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
  describe 'PUT /libs/:id' do
    let(:valid_attributes) { { name: 'Learn Elm', addressLine1: 'Street 1', addressLine2: 'line 2', addressCity: 'some city', addressState: 'some state', addressZip: 'some zip 00000', logo: 'some url/asd/', phone: '123-456-7890', email: 'bestteamever@FARMS.com' } }

    context 'when the record exists' do
      before { put "/libs/#{lib_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /todos/:id
  describe 'DELETE /libs/:id' do
    before { delete "/libs/#{lib_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end