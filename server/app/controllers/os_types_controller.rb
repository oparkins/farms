class OsTypesController < ApplicationController
  before_action :set_company
  before_action :set_division, only: [:show, :update, :destroy]


  # GET /os_type
  def index
json_response(@company.os_type)
  end

  # POST /os_type
  def create
@division = @company.os_type.create!(os_type_params)
      json_response(@division, :created)
  end

  # GET /os_type/:id
  def show
      json_response(@division)
  end

  # PUT /os_type/:id
  def update
      @division.update(os_type_params)
      head :no_content
  end

  # DELETE /os_type/:id
  def destroy
      @division.destroy
      head :no_content
  end

  private

 def set_company
@company = Company.find(params[:company_id])
 end

  def os_type_params
      # whitelist params
      params.permit(:name, :director, :divisionLink)
  end

  def set_division
      @division = @company.os_type.find_by!(id: params[:id]) if @company
  end
end
