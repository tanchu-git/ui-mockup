import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Task as TaskType } from "@/state/api";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";

type TileProps = {
  id: string;
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
          "Completed": "#a9a9a9",
        }

        return (
            <div
            // Return DnD drop
              ref={(instance) => {
                drop(instance);
              }}
              className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
            >
              <div className="mb-3 flex w-full shadow-xl">
                {/* Status header styling */}
                <div
                  className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
                  style={{ backgroundColor: statusColor[status] }}
                />
                    <div className="flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4 dark:bg-dark-secondary">
                    <h3 className="flex items-center text-lg font-semibold dark:text-white">
                        {status}{" "}
                        <span
                        className="ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none
                        dark:bg-dark-tertiary" style={{ width: "1.5rem", height: "1.25rem" }}
                        >
                        {tasksCount}
                        </span>
                    </h3>    

                    <div className="flex items-center gap-1">
                        <button className="flex h-6 w-5 items-center justify-center dark:text-neutral-500">
                            <EllipsisVertical size={26} />
                        </button>
                        {/* <button
                            className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 dark:bg-dark-tertiary dark:text-white"
                            onClick={() => setIsModalNewTaskOpen(true)}
                        >
                            <Plus size={16} />
                        </button> */}
                    </div>                                 
                </div>
              </div>
              
              {/* Call our api to get the tasks */}
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Task key={task.id} task={task} />
                ))}
            </div>
          );
    }

type TaskProps = {
    task: TaskType;
    }

// Drag hook from react DnD
const Task = ({ task }: TaskProps) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))
    
    // Split the tags, split them by comma to avoid error with empty arrays
    const taskTagsSplit = task.tags ? task.tags.split(",") : [];
    
    // Reformat datetime
    const formattedStartDate = task.startDate
        ? format(new Date(task.startDate), "P")
        : "";
    const formattedDueDate = task.dueDate
        ? format(new Date(task.dueDate), "P")
        : "";
    
    // Create priority tags and their respective styling
    const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
        <div
            className={`rounded-full px-2 py-1 text-s font-semibold ${
                priority === "Urgent" ? "bg-red-200 text-red-700" : 
                priority === "High" ? "bg-yellow-200 text-yellow-700" : 
                priority === "Normal" ? "bg-green-200 text-green-700" : 
                priority === "Low" ? "bg-blue-200 text-blue-700" : 
                    "bg-gray-200 text-gray-700"
            }`}
        >
        {priority}
        </div>
    );
    
    return (
        <div
        // return DnD drag
        ref={(instance) => {
            drag(instance);
        }}
        // Tile shadow
        className={`mb-4 rounded-md bg-white shadow-xl dark:bg-dark-secondary 
            ${isDragging ? "opacity-50" : "opacity-100"}
            `}
        >
            {/* Tile styling */}
            <div className="p-4 md:p-5">
                <div className="flex items-start justify-between">
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                        {task.priority && <PriorityTag priority={task.priority} />}
                        <div className="flex gap-2">
                        {taskTagsSplit.map((tag) => (
                            <div
                            key={tag}
                            className="rounded-full bg-blue-100 px-2 py-1 text-s"
                            >
                            {" "}
                            {tag}
                            </div>
                        ))}
                        </div>
                    </div>
                    <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
                        <EllipsisVertical size={26} />
                    </button>
                </div>   
                <div className="my-3 flex justify-between">
                    <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
                </div> 
                <div className="text-s text-gray-500 dark:text-neutral-500">
                    {formattedStartDate && <span>{formattedStartDate} - </span>}
                    {formattedDueDate && <span>{formattedDueDate}</span>}
                </div>
                <p className="text-base text-gray-600 dark:text-neutral-500">
                    {task.description}
                </p>
                <div className="mt-4 border-t border-gray-300 dark:border-stroke-dark" />
            </div>
        </div>
    );
}

export default TileView