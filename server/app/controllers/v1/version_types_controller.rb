class V1::VersionTypesController < V1::ApplicationController
    before_action :set_company
    before_action :set_division
    before_action :set_project
    before_action :set_version_type, only: [:show, :update, :destroy]


  # GET /version_type
  def index
    json_response(@project.version_types)
  end

  # POST /version_type
  def create
    @version_type = @project.version_types.create!(version_type_params)
    json_response(@version_type, :created)
  end

  # GET /version_type/:id
  def show
    json_response(@version_type)
  end

  # PUT /version_type/:id
  def update
    @version_type.update(version_type_params)
    head :no_content
  end

  # DELETE /version_type/:id
  def destroy
    @version_type.destroy
    head :no_content
  end

  private

  def set_company
    @company = Company.find(params[:company_id])
  end

  def set_division
    @division = @company.divisions.find_by!(id: params[:division_id]) if @company
  end

  def version_type_params
    # whitelist params
    params.permit(:name, :version_id, :project_id)
  end

  def set_project
    @project = @division.projects.find_by!(id: params[:project_id]) if @division
  end

  def set_version_type
    @version_type = @project.version_types.find_by!(id: params[:id]) if @project
  end
end
