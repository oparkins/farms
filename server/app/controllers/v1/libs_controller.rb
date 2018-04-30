class V1::LibsController < V1::ApplicationController
    before_action :set_company
    before_action :set_division
    before_action :set_project
    before_action :set_version
    before_action :set_operating_system 
    before_action :set_lib, only: [:show, :update, :destroy]

    # GET /libs
    def index
      json_response(@operating_system.libs)
    end

    # POST /libs
    def create
      @lib = @operating_system.libs.create!(lib_params)
      json_response(@lib, :created)
    end

    # GET /libs/:id
    def show
      json_response(@lib)
    end

    # PUT /libs/:id
    def update
      @lib.update(lib_params)
      head :no_content
    end

    # DELETE /libs/:id
    def destroy
      @lib.destroy
      head :no_content
    end

    private

    def set_company
      @company = Company.find(params[:company_id])
    end

    def set_division
      @division = @company.divisions.find_by!(id: params[:division_id]) if @company
    end

    def lib_params
      # whitelist params
      params.permit(:name, :verify, :link)
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

    def set_lib
      @lib = @operating_system.libs.find_by!(id: params[:id]) if @operating_system
    end
end
