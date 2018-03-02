class LibsController < ApplicationController
        before_action :set_lib, only: [:show, :update, :destroy]

    # GET /libs
    def index
        @libs = lib.all
        json_response(@libs)
    end

    # POST /libs
    def create
        @lib = lib.create!(libs_params)
        json_response(@lib, :created)
    end

    # GET /libs/:id
    def show
        json_response(@lib)
    end

    # PUT /libs/:id
    def update
        @lib.update(libs_params)
        head :no_content
    end

    # DELETE /libs/:id
    def destroy
        @lib.destroy
        head :no_content
    end

    private

    def libs_params
        # whitelist params
        params.permit(:name, :verify, :link)
    end

    def set_lib
        @lib = lib.find(params[:id])
    end
end
