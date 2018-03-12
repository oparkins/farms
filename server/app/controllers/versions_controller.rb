class VersionsController < ApplicationController
  before_action :set_company
  before_action :set_division, only: [:show, :update, :destroy]


  # GET /version
  def index
	  json_response(@company.version)
  end

  # POST /version
  def create
@division = @company.version.create!(version_params)
      json_response(@division, :created)
  end

  # GET /version/:id
  def show
      json_response(@division)
  end

  # PUT /version/:id
  def update
      @division.update(version_params)
      head :no_content
  end

  # DELETE /version/:id
  def destroy
      @division.destroy
      head :no_content
  end

  private

 def set_company
@company = Company.find(params[:company_id])
 end

  def version_params
      # whitelist params
      params.permit(:name, :director, :divisionLink)
  end

  def set_division
      @division = @company.version.find_by!(id: params[:id]) if @company
  end
end
