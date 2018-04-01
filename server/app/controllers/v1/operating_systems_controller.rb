class V1::OperatingSystemsController < V1::ApplicationController
    before_action :set_company
    before_action :set_division
    before_action :set_project
    before_action :set_version
    before_action :set_operating_system, only: [:show, :update, :destroy]


  # GET /os
  def index
    json_response(@version.operating_systems)
  end

  # POST /os
  def create
    @operating_system = @version.operating_systems.create!(os_params)
    json_response(@operating_system, :created)
  end

  # GET /os/:id
  def show
    json_response(@operating_system)
  end

  # PUT /os/:id
  def update
    @operating_system.update(os_params)
    head :no_content
  end

  # DELETE /os/:id
  def destroy
    @operating_system.destroy
    head :no_content
  end

  private

    def set_company
        @company = Company.find(params[:company_id])
    end

    def set_division
        @division = @company.divisions.find_by!(id: params[:division_id]) if @company
    end

    def os_params
        # whitelist params
        params.permit()
    end

    def set_project
        @project = @division.projects.find_by!(id: params[:project_id]) if @division
    end

    def set_version
        @version = @project.versions.find_by!(id: params[:version_id]) if @project
    end

    def set_operating_system
        @operating_system = @version.operating_systems.find_by!(id: params[:id]) if @version
    end
end
