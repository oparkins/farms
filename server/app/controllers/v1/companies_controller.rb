class V1::CompaniesController < V1::ApplicationController
    before_action :set_company, only: [:show, :update, :destroy]

    # GET /companies
    def index
        @companies = Company.all
        json_response(@companies)
    end

    # POST /companies
    def create
        @company = Company.create!(companies_params)
        json_response(@company, :created)
    end

    # GET /companies/:id
    def show
        json_response(@company)
    end

    # PUT /companies/:id
    def update
        @company.update(companies_params)
        head :no_content
    end

    # DELETE /companies/:id
    def destroy
        @company.destroy
        head :no_content
    end

    private

    def companies_params
        # whitelist params
        params.permit(:name, :addressLine1, :addressLine2,
                      :addressCity, :addressState, :addressZip, 
                      :logo, :phone, :email)
    end

    def set_company
        @company = Company.find(params[:id])
    end
end
