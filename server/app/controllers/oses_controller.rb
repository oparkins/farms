class OsesController < ApplicationController
  before_action :set_company
  before_action :set_division, only: [:show, :update, :destroy]


  # GET /os
  def index
json_response(@company.os)
  end

  # POST /os
  def create
@division = @company.os.create!(os_params)
      json_response(@division, :created)
  end

  # GET /os/:id
  def show
      json_response(@division)
  end

  # PUT /os/:id
  def update
      @division.update(os_params)
      head :no_content
  end

  # DELETE /os/:id
  def destroy
      @division.destroy
      head :no_content
  end

  private

 def set_company
@company = Company.find(params[:company_id])
 end

  def os_params
      # whitelist params
      params.permit(:name, :director, :divisionLink)
  end

  def set_division
      @division = @company.os.find_by!(id: params[:id]) if @company
  end
end
