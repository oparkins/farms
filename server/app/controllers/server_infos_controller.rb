class ServerInfosController < ApplicationController
    # POST /server_info
    def create
        if ServerInfo.first == nil 
            ServerInfo.create!(serverinfos_params)
        else
            ServerInfo.update(serverinfos_params)
        end
        
        json_response(ServerInfo.first, :created)
    end

    # GET /serverinfo
    def show
        json_response(ServerInfo.first)
    end

    # PUT /serverinfo/
    def update
        ServerInfo.update(serverinfos_params)
        head :no_content
    end

    # DELETE /serverinfo
    def destroy
        ServerInfo.destroy
        head :no_content
    end

    private

    def serverinfos_params
        # whitelist params
        params.permit(:server_version, :api_version, :app_setup)
    end
end
