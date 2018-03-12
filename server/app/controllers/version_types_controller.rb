class VersionTypesController < ApplicationController
  before_action :set_company
  before_action :set_division, only: [:show, :update, :destroy]


  # GET /version_type
  def index
json_response(@company.version_type)
  end

  # POST /version_type
  def create
@division = @company.version_type.create!(version_type_params)
      json_response(@division, :created)
  end

  # GET /version_type/:id
  def show
      json_response(@division)
  end

  # PUT /version_type/:id
  def update
      @division.update(version_type_params)
      head :no_content
  end

  # DELETE /version_type/:id
  def destroy
      @division.destroy
      head :no_content
  end

  private

 def set_company
@company = Company.find(params[:company_id])
 end

  def version_type_params
      # whitelist params
      params.permit(:name, :director, :divisionLink)
  end

  def set_division
      @division = @company.version_type.find_by!(id: params[:id]) if @company
  end
end
