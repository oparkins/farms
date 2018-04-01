require 'rails_helper'

RSpec.describe 'Companies API', type: :request do
  # initialize test data 
  let!(:companies) { create_list(:company, 10) }
  let(:company_id) { companies.first.id }

  # Test suite for GET
  describe 'GET /v1/companies' do
    # make HTTP get request before each example
    before { get '/v1/companies' }

    it 'returns companies' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET
  describe 'GET /v1/companies/:id' do
    before { get "/v1/companies/#{company_id}" }

    context 'when the record exists' do
      it 'returns the company' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(company_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:company_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Company/)
      end
    end
  end

  # Test suite for POST
  describe 'POST /v1/companies' do
    # valid payload
    let(:valid_attributes) { { name: 'Learn Elm', addressLine1: 'Street 1', addressLine2: 'line 2', addressCity: 'some city', addressState: 'some state', addressZip: 'some zip 00000', logo: 'some url/asd/', phone: '123-456-7890', email: 'bestteamever@FARMS.com' } }

    context 'when the request is valid' do
      before { post '/v1/companies', params: valid_attributes }

      it 'creates a companies' do
        expect(json['name']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/v1/companies', params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Addressline1 can't be blank, Addressline2 can't be blank, Addresscity can't be blank, Addressstate can't be blank, Addresszip can't be blank, Logo can't be blank, Phone can't be blank, Email can't be blank/)
      end
    end
  end

  # Test suite for PUT
  describe 'PUT /v1/companies/:id' do
    let(:valid_attributes) { { name: 'Learn Elm', addressLine1: 'Street 1', addressLine2: 'line 2', addressCity: 'some city', addressState: 'some state', addressZip: 'some zip 00000', logo: 'some url/asd/', phone: '123-456-7890', email: 'bestteamever@FARMS.com' } }

    context 'when the record exists' do
      before { put "/v1/companies/#{company_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE
  describe 'DELETE /v1/companies/:id' do
    before { delete "/v1/companies/#{company_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end