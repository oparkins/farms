class DivisionsController < ApplicationController
    before_action :set_division, only: [:show, :update, :destroy]

    # GET /divisions
    def index
        @divisions = division.all
        json_response(@divisions)
    end

    # POST /divisions
    def create
        @division = division.create!(divisions_params)
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

    def divisions_params
        # whitelist params
        params.permit(:name, :director, :divisionLink)
    end

    def set_division
        @division = division.find(params[:id])
    end
end
