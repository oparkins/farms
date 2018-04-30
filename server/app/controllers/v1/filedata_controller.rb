class V1::FiledataController < V1::ApplicationController
    before_action :set_company
    before_action :set_division
    before_action :set_project
    before_action :set_version
    before_action :set_operating_system
    before_action :set_filedata, only: [:show, :update, :destroy]

    # GET /filedata
    def index
        json_response(@operating_system.file_data.all)
    end

    # POST /filedatas
    def create
        @file_datum = @operating_system.file_data.create!(file_datum_params)
        json_response(@file_datum, :created)
    end

    # GET /filedatas/:id
    def show
        json_response(@file_datum)
    end

    # PUT /filedatas/:id
    def update
        @file_datum.update(file_datum_params)
        head :no_content
    end

    # DELETE /filedatas/:id
    def destroy
        @file_datum.destroy
        head :no_content
    end

    private

    def set_company
        @company = Company.find(params[:company_id])
    end

    def set_division
        @division = @company.divisions.find_by!(id: params[:division_id]) if @company
    end

    def file_datum_params
        # whitelist params
        params.permit(:name, :data, :dataHash)
    end

    def set_project
        @project = @division.projects.find_by!(id: params[:project_id]) if @division
    end

    def set_version
        @version = @project.versions.find_by!(id: params[:version_id]) if @project
    end

    def set_operating_system
        @operating_system = @version.operating_systems.find_by!(id: params[:operating_system_id]) if @version
    end

    def set_filedata
        @file_datum = @operating_system.file_data.find_by!(id: params[:id]) if @operating_system
    end
end
