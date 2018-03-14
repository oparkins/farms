class OsTypesController < ApplicationController
  before_action :set_os_type, only: [:show, :update, :destroy]


  # GET /os_type
  def index
    json_response(OsType.all)
  end

  # POST /os_type
  def create
    @os_type = OsType.create!(os_type_params)
    json_response(@os_type, :created)
  end

  # GET /os_type/:id
  def show
      json_response(@os_type)
  end

  # PUT /os_type/:id
  def update
      @os_type.update(os_type_params)
      head :no_content
  end

  # DELETE /os_type/:id
  def destroy
      @os_type.destroy
      head :no_content
  end

  private
  def os_type_params
      # whitelist params
      params.permit(:name, :operating_system_id)
  end

  def set_os_type
      @os_type = OsType.find(params[:id])
  end
end
