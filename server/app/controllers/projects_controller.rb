class ProjectsController < ApplicationController
    before_action :set_company
    before_action :set_division
    before_action :set_project, only: [:show, :update, :destroy]

    # GET /projects
    def index
        @projects = @division.projects
        json_response(@projects)
    end

    # POST /projects
    def create
	@project = @division.projects.create!(projects_params)
        json_response(@project, :created)
    end

    # GET /projects/:id
    def show
        json_response(@project)
    end

    # PUT /projects/:id
    def update
        @project.update(projects_params)
        head :no_content
    end

    # DELETE /projects/:id
    def destroy
        @project.destroy
        head :no_content
    end

    private

    def set_company
	    @company = Company.find(params[:company_id])
    end

    def set_division
        @division = @company.divisions.find_by!(id: params[:division_id]) if @company
    end

    def projects_params
        # whitelist params
        params.permit(:name, :projectLead, :email)
    end

    def set_project
        @project = @division.projects.find_by!(id: params[:id]) if @division
    end
end

