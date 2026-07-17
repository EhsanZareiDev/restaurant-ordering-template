

export default function ProgressStep({

    title,

    description,

    icon: Icon,

    isComplated,

    isActive,

    isLast,

}) {

    return (

        <div className="flex gap-4 group">

            {/* Timeline */}

            <div className="flex flex-col items-center">

                <div
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        transition-all
                        duration-200

                        ${
                            isComplated
                                ? "bg-orange-100 text-orange-500"

                                : isActive

                                ? "bg-white text-orange-500 ring-1 ring-orange-500 shadow-[0_0_10px_0] shadow-orange-500"

                                : "bg-stone-100 text-stone-400"
                        }
                    `}
                >

                    <Icon size={25} />

                </div>

                {!isLast && (

                    <div
                        className={`
                            mt-1
                            mb-1
                            w-[0px]
                            border
                            flex-1

                            ${
                                isComplated

                                    ? "border-orange-500"

                                    : "border-stone-200 border-dashed"
                            }
                        `}
                    />

                )}

            </div>

            {/* Content */}

            <div className={!isLast ? 'pb-10' : ''}>

                <h4 className="font-semibold text-stone-900 group-hover:text-shadow-lg duration-200  cursor-context-menu">

                    {title}

                </h4>

                <p className="mt-1 text-sm leading-6 text-stone-500 group-hover:text-shadow-lg duration-200 cursor-context-menu">

                    {description}

                </p>

            </div>

        </div>

    );

}