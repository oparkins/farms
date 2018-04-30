class V1::DivisionsController < V1::ApplicationController
    before_action :set_company
    before_action :set_division, only: [:show, :update, :destroy]


    # GET /divisions
    def index
	json_response(@company.divisions)
    end

    # POST /divisions
    def create
	@division = @company.divisions.create!(divisions_params)
        json_response(@division, :created)
    end

    # GET /divisions/:id
    def show
        json_response(@division)
    end

    # PUT /divisions/:id
    def update
        @division.update(divisions_params)
        head :no_content
    end

    # DELETE /divisions/:id
    def destroy
        @division.destroy
        head :no_content
    end

    private

   def set_company
	@company = Company.find(params[:company_id])
   end

    def divisions_params
        # whitelist params
        params.permit(:name, :director, :divisionLink)
    end

    def set_division
        @division = @company.divisions.find_by!(id: params[:id]) if @company
    end
end
