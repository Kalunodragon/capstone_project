class EmployeesController < ApplicationController
    skip_before_action :auth, only: :create

    def create
        
    end

    def show

    end

    def update

    end

    def destroy

    end
end
