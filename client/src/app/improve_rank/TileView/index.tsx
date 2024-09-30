import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

type TileProps = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Completed"];

const TileView = ({id, setIsModalNewTaskOpen}: TileProps) => {
    // call our state/api functions
    const {data: tasks, isLoading, error} = useGetTasksQuery({businessId: Number(id)});
    const [updateTaskStatus] = useUpdateTaskStatusMutation();

    //  Function to call updateTaskStatus
    const moveTask = (taskId: number, toStatus: string) => {
        updateTaskStatus({taskId, status: toStatus})
    }

    if (isLoading) return <div>Loading..</div>
    if (error) return <div>Error occured while fetchin tasks</div>
    
    // React drag and drop function
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
                {taskStatus.map((status) => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasks || []}
                        moveTask={moveTask}
                        setIsModalNewTaskOpen={setIsModalNewTaskOpen}
                    />
                ))}
            </div>
        </DndProvider>
    )
}

type TaskColumnProps = {
    status: string;
    tasks: TaskType[];
    moveTask: (taskId: number, toStatus: string) => void;
    setIsModalNewTaskOpen: (isOpen: boolean) => void;
  }
  
// Drag and drop functionality
const TaskColumn = ({
        status,
        tasks,
        moveTask,
        setIsModalNewTaskOpen,
    }: TaskColumnProps) => {
        // useDrop hook from react DnD
        const [{ isOver }, drop] = useDrop(() => ({
            accept: "task",
            // When grabbed task is dropped, call moveTask
            drop: (item: { id: number }) => moveTask(item.id, status),
            collect: (monitor: any) => ({
                isOver: !!monitor.isOver(),
            }),
        }))

        // Count specific tasks for each column
        const tasksCount = tasks.filter((task) => task.status === status).length;

        const statusColor: any = {
          "To Do": "#2563EB",
          "Work In Progress": "#059669",
          Completed: "#000000",
        }

        return (
            <div
            // Handle the drop and styling
              ref={(instance) => {
                drop(instance);
              }}
              className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
            >
              <div className="mb-3 flex w-full">
                <div
                  className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                  style={{ backgroundColor: statusColor[status] }}
                />
                <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                  <h3 className="flex items-center text-lg font-semibold dark:text-white">
                    {status}{" "}
                    <span
                      className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-dark-tertiary"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    >
                      {tasksCount}
                    </span>
                  </h3>                  
                </div>
              </div>
        
              {/* {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))} */}
            </div>
          );
    }

export default TileView