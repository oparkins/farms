class FiledataController < ApplicationController
    before_action :set_filedata, only: [:show, :update, :destroy]

    # GET /filedata
    def index
        @filedatas = Filedata.all
        json_response(@filedatas)
    end

    # POST /filedatas
    def create
        @filedata = Filedata.create!(filedatas_params)
        json_response(@filedata, :created)
    end

    # GET /filedatas/:id
    def show
        json_response(@filedata)
    end

    # PUT /filedatas/:id
    def update
        @filedata.update(filedatas_params)
        head :no_content
    end

    # DELETE /filedatas/:id
    def destroy
        @filedata.destroy
        head :no_content
    end

    private

    def filedatas_params
        # whitelist params
        params.permit(:name, :addressLine1, :addressLine2,
                      :addressCity, :addressState, :addressZip, 
                      :logo, :phone, :email)
    end

    def set_filedata
        @filedata = Filedata.find(params[:id])
    end
end
