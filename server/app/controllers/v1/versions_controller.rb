class V1::VersionsController < V1::ApplicationController
  before_action :set_company
  before_action :set_division
  before_action :set_project
  before_action :set_version, only: [:show, :update, :destroy]

  # GET /version
  def index
      @versions = @project.versions
      render :json => @versions.to_json(:include => [:version_type]), status: :ok
  end

  # POST /version
  def create
      @version = @project.versions.create!(version_params)
      json_response(@version, :created)
  end

  # GET /version/:id
  def show
      render :json => @version.to_json(:include => [:version_type]), status: :ok
  end

  # PUT /version/:id
  def update
      @version.update(version_params)
      head :no_content
  end

  # DELETE /version/:id
  def destroy
      @version.destroy
      head :no_content
  end

  private

    def set_company
       @company = Company.find(params[:company_id])
    end

    def set_division
      @division = @company.divisions.find_by!(id: params[:division_id]) if @company
    end

    def version_params
        # whitelist params
        params.permit(:gitLink, :docLink, :ciLink, :buildDate, :version_type_id, :majorNumber, :minorNumber, :patchNumber)
    end

    def set_project
        @project = @division.projects.find_by!(id: params[:project_id]) if @division
    end

    def set_version
        @version = @project.versions.joins(:version_type).find_by!(id: params[:id]) if @project
    end
end